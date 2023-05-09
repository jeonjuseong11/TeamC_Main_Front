import { Button, Input } from "antd";
import styled from "styled-components";

export const SearchWrapper = styled.div`
  width: 50%;
  margin: 5rem auto;
`;
export const SearchInput = styled(Input)`
  width: 60%;
`;
export const FilterButton = styled(Button)`
    height: 4em;
    width: 4em;
    marginTop: 1rem;
    marginRight: 1rem;
`;