export async function uploader(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
  return fetch("https://api.cloudinary.com/v1_1/dptflpyhd/image/upload", {
    method: "POST",
    body: data,
  }).then((resp) => resp.json());
}
