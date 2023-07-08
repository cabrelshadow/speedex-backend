const db = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
	const role = await db.Role.findAll({ raw: true });
	return res.render("settings/role", { role });
});

const userId = 2; // Remplacez par l'ID du rôle que vous souhaitez supprimer

db.User.destroy({
  where: { id: userId }
})
  .then(() => {
    console.log('Suppression réussie');
    // Continuez votre logique ici si nécessaire
    process.exit(0); // Quittez le processus Node.js
  })
  .catch((err) => {
    console.error('Errer lors de la suppression :', err);
    process.exit(1); // Quittez le processus Node.js avec une erreur
  });