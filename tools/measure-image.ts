import sharp from 'sharp';

export type Shape = {
  width: number;
  height: number;
};

/** EXIF orientations from this value on are rotated a quarter turn. */
const ROTATED = 5;

export const measureImage = async (file: string): Promise<Shape> => {
  const { width, height, orientation = 1 } = await sharp(file).metadata();

  if (!width || !height)
    throw new Error(`Could not read the dimensions of ${file}.`);

  return orientation >= ROTATED
    ? { width: height, height: width }
    : { width, height };
};
