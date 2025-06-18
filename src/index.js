import app from "./app";

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
