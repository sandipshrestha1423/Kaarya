export const getUser = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  }
  try {
    return JSON.parse(user);
  } catch (error) {
    return null;
  }
};

export const setUser = (user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
};

export const logout = () => {
  setUser(null);
};

export const isAuthenticated = () => {
  return !!getUser();
};
