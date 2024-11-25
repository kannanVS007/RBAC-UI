export const apiFetchUsers = async () => {
    // Simulate API call
    return [
      { id: 1, name: 'John Doe', role: 'Admin' },
      { id: 2, name: 'Jane Doe', role: 'Editor' },
    ];
  };
  
  export const apiAddUser = async (user: any) => {
    // Simulate API call
    return { ...user, id: Math.random() };
  };
  
  export const apiDeleteUser = async (userId: number) => {
    // Simulate API call
    return { status: 'success' };
  };
  