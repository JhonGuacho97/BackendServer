import { Validators } from "../../config";
import { cartShopModel } from "../../data";
import { CreateCartShopDto, customErrors } from "../../domain";

export class CartShopService {
  constructor() {}

  async AddCartShopProduct(createShopDto: CreateCartShopDto) {
    try {
      const cart = await cartShopModel.findOne({ user: createShopDto.user });
      if (cart) {
        const existeCarrito = cart.products.find(
          (product) => product.product.toString() === createShopDto.product
        );

        if (
          existeCarrito &&
          existeCarrito.quantity !== undefined &&
          existeCarrito.quantity !== null
        ) {
          existeCarrito.quantity += 1;
        } else {
          cart.products.push({ product: createShopDto.product, quantity: 1 });
        } 

        await cart.save();
        return { message: "Se añadio al carrito con exito" };
      } else {
        const newCart = new cartShopModel({
          user: createShopDto.user,
          products: [
            {
              product: createShopDto.product,
              quantity: 1,
            },
          ],
        });

        await newCart.save();
        return { message: "Producto añadido al carrito con exito" };
      }
    } catch (error) {
      throw customErrors.internalServer(`${error}`);
    }
  }

  async getCartShop(userId: string) {
    try {
      const cart = await cartShopModel.find({ user: userId });

      return cart;
    } catch (error) {
      throw customErrors.internalServer(`${error}`);
    }
  }

  async deleteAndUpdateCart(idCartItem: string) {
    if (!Validators.isMongoId(idCartItem)) {
      throw customErrors.badRequest("id invalido");
    }

    try {
      const updatedCart = await cartShopModel.findOneAndUpdate( 
        { "products._id": idCartItem },
        { $pull: { products: { _id: idCartItem } } },
        { new: true }
      );

      if (!updatedCart)
        throw customErrors.badRequest("no hay elementos en el carrito");

      return updatedCart;
    } catch (error) {
      throw customErrors.internalServer(`${error}`);
    }
  }
}
