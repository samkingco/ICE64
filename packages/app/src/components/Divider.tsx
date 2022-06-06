import styled from "@emotion/styled";
import withMargin from "./withMargin";

export const Divider = styled.hr`
  border: none;
  width: 100%;
  height: 1px;
  background: var(--foreground);
  opacity: 0.1;
  ${withMargin};
`;
