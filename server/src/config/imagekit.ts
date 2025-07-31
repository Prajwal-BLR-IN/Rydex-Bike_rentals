import ImageKit from "imagekit";

const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

if (!publicKey || !privateKey || !urlEndpoint) {
  throw new Error("ImageKit keys are missing from environment variables");
}

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export default imagekit;
