import { Response } from "miragejs";

/**
 * All the routes related to Size are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all sizes in the db.
 * send GET Request at /api/sizes
 * */

export const getAllSizesHandler = function () {
  try {
    return new Response(200, {}, { sizes: this.db.sizes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles gets all sizes in the db.
 * send GET Request at /api/user/sizes/:sizeId
 * */

export const getSizeHandler = function (schema, request) {
  const sizeId = request.params.sizeId;
  try {
    const size = schema.sizes.findBy({ _id: sizeId });
    return new Response(200, {}, { size });
  } catch (error) {
    new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
