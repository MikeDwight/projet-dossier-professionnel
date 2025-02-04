export const validateUser = (
  email: string,
  password: string,
  firstname: string,
  lastname: string
) => {
  if (!email || !email.includes("@")) return "Email invalide";
  if (!password || password.length < 6)
    return "Le mot de passe doit contenir au moins 6 caractères";
  if (!firstname || firstname.length < 2)
    return "Le prénom doit contenir au moins 2 caractères";
  if (!lastname || lastname.length < 2)
    return "Le nom doit contenir au moins 2 caractères";
  return null;
};

export const validateCard = (
  name: string,
  number: number,
  serie: string,
  bloc: string,
  condition: string
) => {
  if (!name) return "Le nom de la carte est obligatoire";
  if (!number || number <= 0)
    return "Le numéro de la carte doit être un entier positif";
  if (!serie) return "Le nom de la série est obligatoire";
  if (!bloc) return "Le nom du bloc est obligatoire";
  if (!condition) return "La condition de la carte est obligatoire";
  return null;
};
