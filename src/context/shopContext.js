import React, { Component } from 'react'
import Client from 'shopify-buy'


// create the context
const ShopContext = React.createContext();




const client = Client.buildClient({
  domain: "testingstore1013.myshopify.com",
  storefrontAccessToken: "004f654e00e8ed20a649c28f54c6821a"
})






export class ShopProvider extends Component {

  state = {
    product: {},
    products: [],
    checkout: {},
    isCartOpen: false,
    isMenuOpen: false
  }


  // componentDidMount to get checkout when we first initil
  componentDidMount() {
    if (localStorage.checkout_id) {
      this.fetchCheckout(localStorage.checkout_id)
    } else {
      this.createCheckout()
    }
  }



  // shopify creates unique URL for that checkout
  createCheckout = async () => {
    // local storage to save products and checkout id
    const checkout = await client.checkout.create()
    // saves checkout id to localstorage
    localStorage.setItem("checkout_id", checkout.id)

    // update state
    this.setState({ checkout })
  }


  fetchCheckout = (checkoutId) => {
    client.checkout
      .fetch(checkoutId)
      .then(checkout => {
        this.setState({ checkout: checkout })
      })
  }


  addItemToCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: parseInt(quantity, 10)
      }
    ]

    // addLineItems is provided by shopify...add item to checkout
    const checkout = await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd)

    // update state
    this.setState({ checkout: checkout })

    // open cart whenever new lineitem is added
    this.openCart();
  }


  removeLineItem = async (lineItemIdsToRemove) => {
    const checkout = await client.checkout.removeLineItems(this.state.checkout.id, lineItemIdsToRemove)
    // update id
    this.setState({ checkout: checkout })
  }


  fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products })
  }


  // name of product that is compatitble with links
  fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle);
    this.setState({ product })
  }





  closeCart = () => {
    this.setState({ isCartOpen: false })
  }

  openCart = () => {
    this.setState({ isCartOpen: true })
  }


  closeMenu = () => {
    this.setState({ isMenuOpen: false })
  }


  openMenu = () => {
    this.setState({ isMenuOpen: true })
  }






  render() {

    console.log(this.state.checkout);

    return (
      // props is to provide values that we want to pass down to children components, which state and funcs
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithHandle: this.fetchProductWithHandle,
          addItemToCheckout: this.addItemToCheckout,
          removeLineItem: this.removeLineItem,
          closeCart: this.closeCart,
          openCart: this.openCart,
          closeMenu: this.closeMenu,
          openMenu: this.openMenu
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    )
  }
}


// Consumer, whats actually consuming the Context
const ShopConsumer = ShopContext.Consumer


export { ShopConsumer, ShopContext }




export default ShopProvider
