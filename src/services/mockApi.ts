// User and Role Interfaces
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

// Mock data with Set to prevent duplicates
let rolesSet = new Set(
  [
    { id: '1', name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: '2', name: 'Editor', permissions: ['Read', 'Write'] },
    { id: '3', name: 'Viewer', permissions: ['Read'] },
  ].map(role => JSON.stringify(role))
);

let permissionsSet = new Set(
  [
    { id: '1', name: 'Read', description: 'Can read data', module: 'Users' },
    { id: '2', name: 'Write', description: 'Can write data', module: 'Users' },
    { id: '3', name: 'Delete', description: 'Can delete data', module: 'Users' },
  ].map(permission => JSON.stringify(permission))
);

// Helper function to convert Set to array for roles
const getRolesArray = (): Role[] => {
  return Array.from(rolesSet).map(roleString => JSON.parse(roleString));
};

// Helper function to convert Set to array for permissions
const getPermissionsArray = (): Permission[] => {
  return Array.from(permissionsSet).map(permissionString => JSON.parse(permissionString));
};

// **Role Methods**

export const fetchRoles = async (): Promise<Role[]> => {
  return Promise.resolve(getRolesArray());
};

export const addRole = async (role: Role): Promise<void> => {
  const exists = getRolesArray().some(
    existingRole => 
      existingRole.name.toLowerCase() === role.name.toLowerCase() ||
      existingRole.id === role.id
  );

  if (!exists) {
    rolesSet.add(JSON.stringify(role));
  }
  return Promise.resolve();
};

export const updateRole = async (role: Role): Promise<void> => {
  const roles = getRolesArray();
  const index = roles.findIndex((r) => r.id === role.id);
  if (index !== -1) {
    roles[index] = role; // Direct update instead of recreating the set
    rolesSet = new Set(roles.map(role => JSON.stringify(role))); // Update the Set
  }
  return Promise.resolve();
};

export const deleteRole = async (id: string): Promise<void> => {
  const roles = getRolesArray();
  rolesSet = new Set(
    roles.filter(role => role.id !== id).map(role => JSON.stringify(role))
  );
  return Promise.resolve();
};

// **Permission Methods**

export const fetchPermissions = async (): Promise<Permission[]> => {
  return Promise.resolve(getPermissionsArray());
};

export const addPermission = async (permission: Permission): Promise<void> => {
  const exists = getPermissionsArray().some(
    existingPermission => 
      existingPermission.name.toLowerCase() === permission.name.toLowerCase()
  );

  if (!exists) {
    permissionsSet.add(JSON.stringify(permission));
  }
  return Promise.resolve();
};

export const updatePermission = async (permission: Permission): Promise<void> => {
  const permissions = getPermissionsArray();
  const index = permissions.findIndex((p) => p.id === permission.id);
  if (index !== -1) {
    permissions[index] = permission; // Direct update instead of recreating the set
    permissionsSet = new Set(permissions.map(permission => JSON.stringify(permission))); // Update the Set
  }
  return Promise.resolve();
};

export const deletePermission = async (id: string): Promise<void> => {
  const permissions = getPermissionsArray();
  permissionsSet = new Set(
    permissions.filter(permission => permission.id !== id).map(permission => JSON.stringify(permission))
  );
  return Promise.resolve();
};
