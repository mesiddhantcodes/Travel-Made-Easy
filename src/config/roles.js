const allRoles = {
  user: ['getProfile','getBusInfo' ],
  admin: ['getUsers', 'manageUsers'],
  driver: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
