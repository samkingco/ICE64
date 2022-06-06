import styled from "@emotion/styled";
import {
  Tab as ReachTab,
  TabList as ReachTabList,
  TabPanel,
  TabPanels,
  Tabs as ReachTabs,
  TabsKeyboardActivation,
} from "@reach/tabs";
import { motion } from "framer-motion";
import { useState } from "react";
import { buttonReset } from "./Button";
import { monoStyles } from "./Typography";

const TabsWrapper = styled.div`
  position: relative;
  background: rgba(var(--foreground-alpha), 0.04);
  border-radius: 1rem;
  position: relative;
  margin-bottom: 1.5rem;
  overflow: hidden;

  @media (min-width: 80rem) {
    margin-bottom: 1.5vw;
    border-radius: 1vw;
  }
`;

const TabList = styled(ReachTabList)`
  width: 100%;
  display: flex;
`;

const TabIndicators = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  display: flex;
`;

const TabIndicator = styled(motion.div)`
  background: rgba(var(--foreground-alpha), 0.04);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  border-radius: 1rem;

  @media (min-width: 80rem) {
    border-radius: 1vw;
  }
`;

const TabIndicatorWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const Tab = styled(ReachTab)`
  flex: 1;
  ${buttonReset};
  ${monoStyles};
  padding: 1rem 1.5rem;
  position: relative;
  z-index: 1;
  opacity: 0.48;
  &:hover {
    opacity: 1;
  }
  &[data-reach-tab][data-selected] {
    opacity: 1;
  }
  @media (min-width: 80rem) {
    padding: 1vw 1.5vw;
  }
`;

interface Props {
  tabHeadings: string[];
  tabPanels: React.ReactNode[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
}

export function Tabs({
  tabHeadings,
  tabPanels,
  defaultIndex = 0,
  onChange,
}: Props) {
  const [tabIndex, setTabIndex] = useState(defaultIndex);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <ReachTabs
      index={tabIndex}
      onChange={handleTabsChange}
      keyboardActivation={TabsKeyboardActivation.Manual}
    >
      <TabsWrapper>
        <TabList>
          {tabHeadings.map((tab, idx) => (
            <Tab key={`tab_${tab}`}>{tab}</Tab>
          ))}
        </TabList>

        <TabIndicators>
          {tabHeadings.map((tab, idx) => (
            <TabIndicatorWrapper key={`tab_indicator_${tab}`}>
              {idx === tabIndex && <TabIndicator layoutId="activeTab" />}
            </TabIndicatorWrapper>
          ))}
        </TabIndicators>
      </TabsWrapper>

      <TabPanels>
        {tabPanels.map((panel, idx) => (
          <TabPanel key={`panel_${idx}`}>{panel}</TabPanel>
        ))}
      </TabPanels>
    </ReachTabs>
  );
}
