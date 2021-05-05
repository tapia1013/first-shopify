import React, { useContext } from 'react'
import { ShopContext } from '../context/shopContext'


import { CloseIcon } from '@chakra-ui/icons'

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Grid,
  Text,
  Flex,
  Box,
  Image,
  Link
} from "@chakra-ui/react"





const Cart = () => {

  const { isCartOpen, closeCart, checkout, removeLineItem } = useContext(ShopContext)

  // console.log(checkout);

  return (
    <React.Fragment>
      <Drawer
        isOpen={isCartOpen}
        placement="right"
        onClose={closeCart}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Your Shopping Cart</DrawerHeader>

            <DrawerBody>
              {
                checkout.lineItems && checkout.lineItems.map(item => (
                  <Grid
                    templateColumns="repeat(4, 1fr)"
                    gap={1}
                    key={item.id}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <CloseIcon
                        cursor="pointer"
                        onClick={() => removeLineItem(item.id)}
                      />
                    </Flex>
                    <Flex alignItems="center" justifyContent="center">
                      <Image src={item.variant.image.src} />
                    </Flex>
                    <Flex alignItems="center" justifyContent="center">
                      <Text>
                        {item.title}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" justifyContent="center">
                      <Text>
                        {item.variant.price}
                      </Text>
                    </Flex>
                  </Grid>
                ))
              }
            </DrawerBody>

            <DrawerFooter>
              <Button w="100%">
                <Link
                  w="100%"
                  href={checkout.webUrl}
                >
                  Checkout
                </Link>
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </React.Fragment>
  )
}

export default Cart
