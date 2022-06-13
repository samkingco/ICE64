import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import Collectors from "../components/Collectors";
import { Navigation } from "../components/Navigation";
import SocialMeta from "../components/SocialMeta";
import Transactions from "../components/Transactions";
import { monoStyles, Title } from "../components/Typography";
import { firstParam } from "../utils/firstParam";

const Content = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 8rem 1vw;
  max-width: 64rem;
  margin: 0 auto;

  @media (min-width: 32rem) {
    padding-top: 12rem;
    padding-bottom: 12rem;
  }

  @media (min-width: 80rem) {
    gap: 4vw;
    max-width: 64vw;
    padding-top: 12vw;
    padding-bottom: 16vw;
  }
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  padding: 0 1vw;
  @media (min-width: 32rem) {
    grid-template-columns: 1fr max-content;
    align-items: baseline;
  }
  @media (min-width: 80rem) {
    padding: 0 1vw;
  }
`;

const Tabs = styled.nav`
  display: flex;
  gap: 2rem;
  @media (min-width: 80rem) {
    gap: 2vw;
  }
`;

const Tab = styled.a<{ isActive: boolean }>`
  ${monoStyles};
  opacity: ${(p) => (p.isActive ? 1 : 0.48)};
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  &:hover {
    opacity: 1;
    text-decoration: none;
  }
  &[data-reach-tab][data-selected] {
    opacity: 1;
  }
`;

enum TabType {
  Transactions,
  Collectors,
  Collected,
}

function urlTabToEnum(urlTab?: string): TabType {
  if (urlTab && urlTab.toLowerCase() === "collectors") {
    return TabType.Collectors;
  }
  if (urlTab && urlTab.toLowerCase() === "collected") {
    return TabType.Collected;
  }
  return TabType.Transactions;
}

export default function Feed() {
  const router = useRouter();
  const { tab: urlTab } = router.query;

  const tabs = [
    { name: "Transactions", type: TabType.Transactions },
    { name: "Collectors", type: TabType.Collectors },
    // { name: "Collected", type: TabType.Collected },
  ];
  const currentTab = urlTabToEnum(firstParam(urlTab));

  return (
    <main>
      <SocialMeta
        title="Feed | ICE64"
        description="The latest transactions and activity from ICE64."
        socialImage="/og-image-feed.png"
      />

      <Navigation />

      <Content>
        <Header>
          <Title>Feed</Title>
          <Tabs>
            {tabs.map((tab) => (
              <Link
                key={`tab_${tab.name}`}
                href={{
                  pathname: router.pathname,
                  query: { tab: tab.name.toLowerCase() },
                }}
                replace
                passHref
              >
                <Tab isActive={currentTab === tab.type}>{tab.name}</Tab>
              </Link>
            ))}
          </Tabs>
        </Header>

        {currentTab === TabType.Transactions && <Transactions />}
        {currentTab === TabType.Collectors && <Collectors />}
      </Content>
    </main>
  );
}
