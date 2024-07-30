const pageModel = require("../models/pageModel");
const Joi = require("joi");
const upload = require("../utils/upload");

const pageSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  url: Joi.string().uri().required(),
});

exports.createPage = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "Erro no upload da imagem" });
    }

    const { error, value } = pageSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newPage = {
      title: value.title,
      content: value.content,
      url: value.url,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    };

    pageModel.savePage(newPage);
    res
      .status(201)
      .json({ message: "Página criada com sucesso", page: newPage });
  });
};

// Outras funções como listPages, getPage, updatePage, deletePage, etc.
