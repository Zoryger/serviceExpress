const Livre = require('../models/livre');

const { param, body, validationResult } = require("express-validator");

const livreValidationRules = () => {
  return [   
      body("title")
          .trim()
          .isLength({ min: 1 })
          .escape()
          .withMessage("Title must be specified."),

      body("price")
          .trim()
          .isLength({ min: 1 })
          .escape()
          .withMessage("Price must be specified.")
          .isNumeric()
          .withMessage("Price must be a number."),

      body("author")
          .trim()
          .isLength({ min: 1 })
          .escape()
          .withMessage("Author must be specified."),

      body("publicationDate", "Invalid publication date")
          .isISO8601()
          .toDate()
          .withMessage("PublicationDate must be specified"),
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

exports.createLivre = [bodyIdValidationRule(), livreValidationRules(), checkValidity, (req, res, next) => {
    const lvr = new Livre(req.body);

    lvr.save()
    .then((livre) => {
        return res.status(201).json({livre})
    })
    .catch((error) => { return res.status(400).json({error}) });
}];

exports.getOneLivre = [paramIdValidationRule(), checkValidity,(req, res) => {
    const id = req.params.id;

    Livre.findOne({_id: id})
    .then((livre) => {  if (!livre) {
      return res.status(404).json({ error: "Livre of id "+id+" not find" });
    }
    return res.status(200).json({ livre });})
    .catch((error) => {return res.status(400).json({error})});
}]

exports.getAllLivre = (req, res) => {
    const id = req.params.id;

    Livre.find()
    .then((livre) => { return res.status(200).json({livre})})
    .catch((error) => {return res.status(400).json({error})});
}
exports.updateLivre = [paramIdValidationRule(), livreValidationRules(), checkValidity,(req, res) => {
    const id = req.params.id;
  
    Livre.findByIdAndUpdate(id, req.body, { new: true })
      .then((livre) => {
        if (!livre) {
          return res.status(404).json({ error: "Livre of id "+id+" not find" });
        }
        return res.status(200).json({ livre });
      })
      .catch((error) => { return res.status(400).json({ error }) });
  }];
  
  exports.deleteLivre = [paramIdValidationRule(), checkValidity,(req, res) => {
    const id = req.params.id;
  
    Livre.findByIdAndDelete(id)
      .then((livre) => {
        if (!livre) {
          return res.status(404).json({ error: "Livre of id "+id+" not find" });
        }
        return res.status(200).json({ message: "Livre of id "+id+" delete with success" });
      })
      .catch((error) => { return res.status(400).json({ error }) });
  }];