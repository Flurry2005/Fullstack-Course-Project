const socketToUser = new Map<string, string>();
const userToSocket = new Map<string, string>();

export function registerSocket(socketId: string, username: string) {
  socketToUser.set(socketId, username);
  userToSocket.set(username, socketId);
}

export function unregisterSocket(socketId: string) {
  const username = socketToUser.get(socketId);
  if (!username) return;

  socketToUser.delete(socketId);
  userToSocket.delete(username);
}

export function getSocketId(username: string): string | undefined {
  return userToSocket.get(username);
}

export function getUsername(socketId: string): string | undefined {
  return socketToUser.get(socketId);
}
