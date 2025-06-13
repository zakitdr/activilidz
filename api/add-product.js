import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const product = req.body;

    const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
    const fileData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath))
      : [];

    fileData.push(product);
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));

    return res.status(200).json({ success: true, message: "Produit ajouté." });
  }

  res.status(405).json({ success: false, message: "Méthode non autorisée." });
}
