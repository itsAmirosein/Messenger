import React, { useEffect, useRef, useState } from "react";
import { InputSearch, SideSearchWrapper,MenuBar ,SearchBar ,SearchInput} from "./StyledComponents";
import * as fa from "react-icons/fa";


export default function SidePanelSearchBar({ onClick, handelOnChange }) {
  const [searchBar, setSearchBar] = useState(false)

  const inputRef = useRef()
  useEffect(() => {
    if (searchBar) {
      inputRef.current.focus()

    }
  }, [searchBar])

  function handelChange(eve) {
    handelOnChange(eve.target.value)

  }
  return (
    <SideSearchWrapper>
      {!searchBar && <MenuBar>
        <fa.FaBars onClick={onClick} />
        <InputSearch>Mapsa Messenger</InputSearch>
        <fa.FaSearch onClick={() => setSearchBar(true)} />
      </MenuBar>}
      {searchBar && <SearchBar>
        <fa.FaArrowLeft onClick={() => setSearchBar(false)} />

        <SearchInput ref={inputRef} onChange={handelChange} placeholder='Search in contacts...' />

      </SearchBar>}
    </SideSearchWrapper>

  );
}
