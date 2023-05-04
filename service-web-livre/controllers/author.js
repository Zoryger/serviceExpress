const Author = require('../models/author');

const { param, body, validationResult } = require("express-validator");


const authorValidationRules = () => {
  return [   
      body("name")
          .trim()
          .isLength({ min: 1 })
          .escape()
          .withMessage("Name must be specified."),

      body("dateOfBirth", "Invalid date of birth")
          .isISO8601()
          .toDate()
          .withMessage("dateOfBirth must be specified"),
  ]
}

const paramIdValidationRule = () => {
  return [
      param("id")
          .trim()
          .isLength({ min: 1 })
          .escape()
          .withMessage("Id must be specified.")
          .isNumeric()
          .withMessage("Id must be a number.")
  ]
};

const bodyIdValidationRule = () => {
  return [
      body("_id")
          .trim()
          .isLength({ min: 1 })
          .escape()
          .withMessage("Id must be specified.")
          .isNumeric()
          .withMessage("Id must be a number.")
  ]
};

// Méthode de vérification de la conformité de la requête  
const checkValidity = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
      return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
      errors: extractedErrors,
  })
}

exports.createAuthor = [bodyIdValidationRule(), authorValidationRules(), checkValidity, (req, res, next) => {
  const author = new Author(req.body);

  author.save()
  .then((author) => {
    return res.status(201).json({ author });
  })
  .catch((error) => {
    return res.status(400).json({ error });
  });  
}];

exports.getOneAuthor = [paramIdValidationRule(), checkValidity,(req, res) => {
  const id = req.params.id;

  Author.findOne({ _id: id })
    .then((author) => {
      if (!author) {
      return res.status(404).json({ error: "Author of id "+id+" not find" });
    }
    return res.status(200).json({ author });})
    .catch((error) => {
      return res.status(400).json({ error });
    });
}];

exports.getAllAuthors = (req, res) => {
  const id = req.params.id;

  Author.find()
    .then((author) => {
      return res.status(200).json({ author });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

exports.updateAuthor = [paramIdValidationRule(), authorValidationRules(), checkValidity,(req, res) => {
    const id = req.params.id;

  Author.findByIdAndUpdate(id, req.body, { new: true })
    .then((author) => {
      if (!author) {
        return res.status(404).json({ error: "Author of id "+id+" not find" });
      }
      return res.status(200).json({ author });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
}];

exports.deleteAuthor = [paramIdValidationRule(), checkValidity,(req, res) => {
  const id = req.params.id;

  Author.findByIdAndDelete(id)
    .then((author) => {
      if (!author) {
        return res.status(404).json({ error: "Author of id "+id+" not find" });
      }
      return res.status(200).json({ message: "Author of id "+id+" delete with success" });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
}];
