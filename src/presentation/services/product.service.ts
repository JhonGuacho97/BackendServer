import {VehiculoModel} from "../../data";
import {CreateVehicleDto, customErrors, FiltersDto} from "../../domain";
import {FileUploadService} from "./file-upload.service";
import {Validators} from "../../config";

export class VehicleServices {
  constructor() {}

  async createProducts(createVehicleDto: CreateVehicleDto, file: any) {
    const productExist = await VehiculoModel.findOne({
      model: createVehicleDto.model,
    });
    if (productExist) throw customErrors.badRequest("Ya existe este modelo");

    try {
      const FileUpload = new FileUploadService();

      const imgs = await FileUpload.uploadMultiple(file);

      const vehicle = new VehiculoModel({
        ...createVehicleDto,
        img: imgs.map((obj) => obj.fileName),
      });

      await vehicle.save();

      return vehicle;
    } catch (error) {
      throw customErrors.internalServer(`${error}`);
    }
  }

  async updateVehicle(vehicleDto: CreateVehicleDto, id: any) {
    try {
      const newVehicle = await VehiculoModel.findByIdAndUpdate(id, vehicleDto, {
        new: true,
      });
      if (!newVehicle)
        throw customErrors.badRequest("no se encontro este vehiculo");

      return {
        id: newVehicle.id,
        state: newVehicle.stateVehicle,
        year: newVehicle.year,
        brand: newVehicle.brand,
        model: newVehicle.model,
        price: newVehicle.price,
        description: newVehicle.description,
        category: newVehicle.category,
      };
    } catch (error) {
      throw customErrors.internalServer(`${error}`);
    }
  }

  async deleteVehicle(productId: string) {
    try {
      if (!Validators.isMongoId(productId))
        throw customErrors.badRequest("ProductId no valud");

      const vehicleById = await VehiculoModel.findById(productId);
      if (!vehicleById) throw customErrors.badRequest("vehiculo no encontrado");

      const fileName = vehicleById.img;

      const fileServices = new FileUploadService();

      fileServices.deleteFile(fileName);

      await VehiculoModel.findByIdAndDelete(productId);

      return {
        message: `Vehiculo con id ${productId} elminado con exito`,
      };
    } catch (error) {
      throw customErrors.internalServer(`${error}`);
    }
  }

  async filtersQueryVehicle(filters: FiltersDto) {
    try {
      const { year, brand, stateVehicle, minPrice, maxPrice } = filters;

      const filterOptions: any = {};

      if (year) filterOptions.year = year;
      if (brand) filterOptions.brand = brand;
      if (stateVehicle) filterOptions.stateVehicle = stateVehicle;
      if (minPrice || maxPrice) {
        filterOptions.price = {};
        if (minPrice) filterOptions.price.$gte = Number(minPrice);
        if (maxPrice) filterOptions.price.$lte = Number(maxPrice);
      }

      return await VehiculoModel.find(filterOptions).populate({
          path: "reviews",
          populate: {
              path: "user",
              select: "name -_id",
          },
          select: "-_id -__v",
      });
    } catch (error) {
      throw customErrors.internalServer(`${error}`);
    }
  }

  async searchVehicle(queryParams: any) {
    try {
      const results = await VehiculoModel.aggregate([
        {
          $search: {
            index: "vehicles",
            text: {
              query: `${queryParams}`,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);

      return results;
    } catch (error) {
      throw customErrors.internalServer(`${error}`);
    }
  }

  async getVehicles() {
    try {
      const cars = await VehiculoModel.find({ avaliable: true }).populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "name -_id",
        },
        select: "-_id -__v -vehicle",
      });
      // .populate('category','-_id -__v -user');

      return cars.map((car) => ({
        state: car.stateVehicle,
        year: car.year,
        brand: car.brand,
        model: car.model,
        price: car.price,
        description: car.description,
        category: car.category,
        image: car.img
      }));
    } catch (error) {
      throw customErrors.internalServer(`${error}`);
    }
  }

  async vehicleById(idVehicle:string){

    try {

      const vehicle = await VehiculoModel.findById(idVehicle)
      .populate({path: 'brand', select: 'name -_id'})
      .populate({path: 'category', select: 'name -_id'})
      .populate({path: 'user', select: 'name email -_id'})

      if(!vehicle) throw customErrors.badRequest('Este vehiculo no esta disponible');

      return vehicle;

    } catch (error) {
      throw customErrors.internalServer(`${error}`)
    }

  }

  async getProductsByBrand(idBrand: string) {
    try {
      const vehicleByBrand = await VehiculoModel.find({ brand: idBrand });

      if (vehicleByBrand.length === 0)
        throw customErrors.badRequest("No hay resultados");

      return vehicleByBrand;
    } catch (error) {
      throw customErrors.internalServer(`${error}`);
    }
  }
}
