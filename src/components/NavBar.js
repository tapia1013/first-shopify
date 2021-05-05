import React, { useContext } from 'react';
import { ShopContext } from '../context/shopContext';
import { Flex, Box, Icon, Image, Text } from '@chakra-ui/react'

import { MdMenu, MdShoppingBasket } from 'react-icons/md'



const NavBar = () => {


  const { openCart, openMenu, checkout } = useContext(ShopContext)


  return (
    <Flex
      backgroundColor="#ffa8e2"
      flexDirection="row"
      justifyContent="space-between"
      p="2rem"
    >
      <Icon
        fill="white"
        as={MdMenu}
        h={30}
        w={30}
        cursor="pointer"
      ></Icon>
      <Image
        src="https://cdn.shopify.com/s/files/1/0472/5705/9496/files/Logologo_1.svg?v=1610055540"
        w={100}
        h={100}
      />
      <Icon
        fill="white"
        as={MdShoppingBasket}
        h={30}
        w={30}
        cursor="pointer"
        onClick={() => openCart()}
      />
    </Flex>
  )
}


export default NavBar;


