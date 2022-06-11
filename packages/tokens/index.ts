import {
  getBinarySVG_Array,
  getRects,
  PixelBuffer,
  pngToPixels,
} from "@exquisite-graphics/js";
import { utils } from "ethers";
import exifr from "exifr";
import fs from "fs";
import path from "path";
import sharp from "sharp";

interface Attribute {
  trait_type: string;
  value: string;
}

interface Metadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: Attribute[];
}

const originalPhotosBaseURI =
  "ipfs://QmSfjahNsYStJeuERwbfKBuiaS1HGkBFh1okxRMkPZFV2c/";

function arrayToChunkedArray<T>(arr: T[], size: number) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

async function main() {
  const metadata: Record<string, Metadata> = {};
  const attributes: Record<string, Attribute[]> = {};
  const storageData: Record<string, string> = {};
  const svgs: Record<string, string> = {};
  const files = fs.readdirSync("source-images");

  for (const file of files) {
    const sourceImage = `source-images/${file}`;
    const extension = path.extname(file);
    const tokenId = file.replace(extension, "");

    if (extension === ".jpg") {
      // Parse original photo exif data for metadata
      const exif = await exifr.parse(sourceImage);

      attributes[tokenId] = [
        { trait_type: "Exposure", value: `1/${1 / exif.ExposureTime}s` },
        { trait_type: "Aperture", value: `ƒ/${exif.FNumber}` },
        { trait_type: "ISO", value: `${exif.ISO}` },
        { trait_type: "Focal length", value: `${exif.FocalLength}mm` },
      ];

      metadata[tokenId] = {
        name: `ICE64 #${tokenId}`,
        description:
          "An original 1 of 1 artwork documenting the desolate landscape of Iceland during the winter. Each original also comes with an on-chain edition of the same photo.",
        image: `${originalPhotosBaseURI}${tokenId}.jpg`,
        external_url: `https://ice64.com/photo/${tokenId}`,
        attributes: attributes[tokenId],
      };

      // Downscale for front-end
      await sharp(sourceImage)
        .resize(2800)
        .jpeg({ quality: 70 })
        .toFile(`../app/public/tokens/${tokenId}.jpg`);
    }

    if (extension === ".png") {
      // Pre-rendered 64x64 pixel images from photoshop for now
      const pixels = await pngToPixels(sourceImage);
      const data = getBinarySVG_Array(pixels) as PixelBuffer;
      const editionStorageData = data.getPixelBuffer();
      storageData[tokenId] = editionStorageData;

      const rects = getRects(editionStorageData);
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" width="100%" height="100%" version="1.1" viewBox="0 0 128 128" fill="#fff"><rect width="128" height="128" fill="#fff" /><g transform="translate(32,32)">${rects}</g></svg>`;

      svgs[tokenId] = svg;

      await fs.promises.writeFile(`output/svgs/${tokenId}.svg`, svg);

      // Also save svgs to app/public
      await fs.promises.writeFile(`../app/public/tokens/${tokenId}.svg`, svg);
    }
  }

  // Save metadata
  for (const [tokenId, data] of Object.entries(metadata)) {
    fs.writeFileSync(`output/metadata/${tokenId}`, JSON.stringify(data));
  }

  // Generate chunks to store edition data on-chain
  const tokenDataArr: string[] = [];
  for (const [_, image] of Object.entries(storageData)) {
    tokenDataArr.push(image);
  }

  const tokenDataChunks = arrayToChunkedArray(tokenDataArr, 2);
  const tokenDataPackedChunks = tokenDataChunks.map((chunk) => {
    const types = Array.from({ length: chunk.length }, () => "bytes");
    return utils.solidityPack(types, chunk);
  });

  for (const [id, chunk] of tokenDataPackedChunks.entries()) {
    fs.writeFileSync(`output/storage/chunk_${id + 1}.txt`, chunk);
  }

  // Data to use in tests
  fs.writeFileSync(
    `../contracts/test/tokenData.ts`,
    `export const data = ${JSON.stringify(storageData)};`
  );

  fs.writeFileSync(
    `../contracts/test/tokenStorageChunks.ts`,
    `export const chunks = ${JSON.stringify(tokenDataPackedChunks)};`
  );

  fs.writeFileSync(
    `../contracts/test/tokenSVGs.ts`,
    `export const svgs = ${JSON.stringify(svgs)};`
  );

  const previewHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Preview</title><style>body {margin:4em; background:black;} main {display:grid; grid-template-columns:repeat(auto-fit,minmax(20vw,1fr)); gap:2em;} img {max-width:100%; height:auto;} div {position:relative; width:100%; height:100%; line-height:0;} svg {position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;} div:hover svg {z-index:1}</style></head><body><main>${Object.keys(
    svgs
  )
    .map(
      (key) =>
        `<div><img src="source-images/${key}.jpg" width="500" height="500" />${svgs[key]}</div>`
    )
    .join("")}</main></body></html>`;

  await fs.promises.writeFile(`preview.html`, previewHtml);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
