import fs from "fs";
import hre, { ethers, network } from "hardhat";

interface Args {
  ownerAddr: Record<string, string>;
  royaltiesAddr: Record<string, string>;
  baseURI: Record<string, string>;
  rootsAddr: Record<string, string>;
  xqstgfxAddr: Record<string, string>;
}

const args: Args = {
  ownerAddr: {
    rinkeby: process.env.OWNER_RINKEBY_ADDRESS || "",
    mainnet: process.env.OWNER_MAINNET_ADDRESS || "",
  },
  royaltiesAddr: {
    rinkeby: process.env.ROYALTIES_RINKEBY_ADDRESS || "",
    mainnet: process.env.ROYALTIES_MAINNET_ADDRESS || "",
  },
  baseURI: {
    rinkeby: process.env.BASE_URI_RINKEBY || "",
    mainnet: process.env.BASE_URI_MAINNET || "",
  },
  rootsAddr: {
    rinkeby: process.env.ROOTS_RINKEBY_ADDRESS || "",
    mainnet: process.env.ROOTS_MAINNET_ADDRESS || "",
  },
  xqstgfxAddr: {
    rinkeby: process.env.XQSTGFX_RINKEBY_ADDRESS || "",
    mainnet: process.env.XQSTGFX_MAINNET_ADDRESS || "",
  },
};

async function exists(path: string) {
  return await fs.promises
    .access(path)
    .then(() => true)
    .catch(() => false);
}

const start = async () => {
  const [deployer] = await ethers.getSigners();
  const deploysPath = `${__dirname}/../deploys.json`;
  const deploys = (await exists(deploysPath))
    ? JSON.parse((await fs.promises.readFile(deploysPath)).toString())
    : {};

  console.log(network.name);

  let ownerAddr = args.ownerAddr[network.name];
  let royaltiesAddr = args.royaltiesAddr[network.name];
  let baseURI = args.baseURI[network.name];
  let rootsAddr = args.rootsAddr[network.name];
  let xqstgfxAddr = args.xqstgfxAddr[network.name];

  const isLocal = network.name === "localhost";

  if (isLocal) {
    ownerAddr = deployer.address;
    royaltiesAddr = deployer.address;
    baseURI = "ipfs://foo";

    const MockERC721Factory = await ethers.getContractFactory("MockERC721");
    const roots = await MockERC721Factory.deploy();
    rootsAddr = roots.address;

    const MockXQSTGFXFactory = await ethers.getContractFactory("MockXQSTGFX");
    const xqstgfx = await MockXQSTGFXFactory.deploy();
    xqstgfxAddr = xqstgfx.address;
  }

  console.log(`Starting deploy on ${network.name} from ${deployer.address}`);

  const ICE64Factory = await ethers.getContractFactory("ICE64");
  const contract = await ICE64Factory.deploy(
    ownerAddr,
    royaltiesAddr,
    baseURI,
    rootsAddr
  );

  console.log("ICE64 deployed to", contract.address);
  console.log("Waiting for 5 confirmations before deploying renderer…");
  const deployedICE64 = await contract.deployTransaction.wait(isLocal ? 0 : 5);

  const ICE64RendererFactory = await ethers.getContractFactory("ICE64Renderer");
  const renderer = await ICE64RendererFactory.deploy(
    ownerAddr,
    deployedICE64.contractAddress,
    xqstgfxAddr
  );

  console.log("Renderer deployed to", renderer.address);
  console.log("Waiting for 5 confirmations before verifying contracts");
  const deployedRenderer = await renderer.deployTransaction.wait(
    isLocal ? 0 : 5
  );

  if (!isLocal) {
    console.log("Verifying contracts…");

    await hre.run("verify:verify", {
      address: deployedICE64.contractAddress,
      constructorArguments: [ownerAddr, royaltiesAddr, baseURI, rootsAddr],
    });
    console.log("Collection verified");

    await hre.run("verify:verify", {
      address: deployedRenderer.contractAddress,
      constructorArguments: [
        ownerAddr,
        deployedICE64.contractAddress,
        xqstgfxAddr,
      ],
    });
    console.log("Renderer verified");
  }

  await fs.promises.writeFile(
    "deploys.json",
    JSON.stringify(
      {
        ...deploys,
        ICE64: {
          ...deploys.ICE64,
          [network.name]: {
            address: deployedICE64.contractAddress,
            blockNumber: deployedICE64.blockNumber,
          },
        },
        ICE64Renderer: {
          ...deploys.ICE64Renderer,
          [network.name]: {
            address: deployedRenderer.contractAddress,
            blockNumber: deployedRenderer.blockNumber,
          },
        },
      },
      null,
      2
    )
  );
};

start().catch((e: Error) => {
  console.error(e);
  process.exit(1);
});
