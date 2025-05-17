exports.sayHello = (req, res) => {
  res.json({ message: "Hello from modular Express inside Netlify Functions!" });
};
