export const validateUser = (email: string, password: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!emailRegex.test(email)) return "Email invalide.";
  if (!passwordRegex.test(password))
    return "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.";
  return null;
};

export const validateCard = (
  name: string,
  number: number,
  serie: string,
  bloc: string,
  imageUrl: string
) => {
  if (!name) return "Le nom de la carte est obligatoire";
  if (!number || number <= 0)
    return "Le numéro de la carte doit être un entier positif";
  if (!serie) return "Le nom de la série est obligatoire";
  if (!bloc) return "Le nom du bloc est obligatoire";
  return null;
};
