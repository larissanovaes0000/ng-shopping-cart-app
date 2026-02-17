# Angular Task

The app called Aubays Shopping cart app.
We provide a few components to build a simple shop with a cart system.
The main goal is to fix a few issues across components and implement add and remove products to you cart, as well as the layout.
 

---

## Your Task

This is a TDD (test driven development) task. 
Your task is to fix a few issues across the app and to add few features and pass the tests. 
It may look scary at first but carry on!

### 1. Layout
- Follow this [Figma link](https://www.figma.com/file/QGFswDNwqstQuFSk7DabB8/Vendas?type=design&node-id=328%3A384&mode=design&t=khgWgICOcAdal1Og-1) to create the same layout in the app.
- It must be
    * Responsive to mobile
    * The Cart items will appear as a dropdown when clicked in navbar on top right
    * There is this feature "sort items by" on the page's top right. The available options are: Price and Name.
- The application is using the bootstrap classes, however they are not being applied.
    * Configure the application to use the bootstrap CSS.

### 2. Cart Service.
- At first, the view only updates when the user interacts with it, to fix this consider the following:
    * Make sure cartState is emiting updates upon subscribing.
    * There are some items already added in the cart. Make sure to display them when open the page
- Implement addProduct, consider the following rules:
    * _cardState should to be updated.
    * Product should be pushed to items Array inside _products.
    * If adding a product that is already in the cart, the product amount should increase instead of adding a new record.
    * Product subtotal should be calculated based of the product amount.
        * EX: PRODUCT_A -> Price: 500 -> Amount: 2 -> Subtotal should be 1000
        * subtotal = price * amount (see calculateSubtotal method already implemented)
     * Cart total price should be calculated based of the subtotals.
        * EX: PRODUCT_A -> Subtotal 1000 + PRODUCT_B -> Subtotal: 750 -> Total price should be 1750.
        * total = sum of all subtotals (see calculateTotal method already implemented) 
- Implement removeProduct, consider the following rules:
    * _cardState should be updated.
    * Product should be removed from items Array inside _products.
    * If removing a product that was added more than once, the product amount should decrease instead of removing the whole.
    * Subtotal and total should be re-calculated accordingly.

### 3. Cart item control 
- Has a potential memory leak.
- Sorting and filtering products leave dangling subscriptions in cart control component.
- Make sure components unsubscribe when they get destroyed. (You can also use async pipe)

### 4. Add new product
- We provide a wide range of 8 products to our shopping list. So you need to help us by creating the add nw products feature.
- Consider the following rules for your form
   * All fields are required
   * Product name must be up to 30 characters or lower
   * Price must accept only numbers. (NO currency format is required ;))
   * Reset button will take the form to pristine state
   * On Save you must add the product in the list, and clean the form

### 5. [BONUS] Unit tests
- The application has some unit tests to help you checkout if everything is working correctly. There are also unit tests which are broken
    * Make sure the unit tests are passing and working correctly

---

Follow the steps above to achieve completion! Feel free to use any of the angular features.
New features in the app are welcome and appreciated.

## If you downloaded the project, make sure to delete node_modules before zipping and uploading it back.

# Setup

1. Run `npm install` to install dependencies.
2. Run `npm start` to start the full local environment:
   * Angular app on `http://localhost:4200`
   * JSON Server API on `http://localhost:3000`
3. If you want to start services separately:
   * `npm run start:web` (Angular only)
   * `npm run start:api` (JSON Server only)
4. Run tests:
   * `npm run test` (single run)
   * `npm run test:watch` (watch mode)

6. If ports are busy (`3000` or `4200`), stop previous processes and run `npm start` again.


