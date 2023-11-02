import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; 

// Fetch all TODO items
export const fetchTodos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching TODO items:", error);
    throw error;
  }
};

export async function createTodo(description) {
  try {
    const response = await axios.post(`${API_BASE_URL}/todos`, { description });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating TODO item:", error);
    throw error;
  }
}

export async function deleteTodoEach(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/todos/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error Deleting TODO item:", error);
    throw error;
  }
}
export async function updateTodo(newDescription,id) {
  try {
    const response = await axios.put(`${API_BASE_URL}/todos/${id}`, { description: newDescription });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error Updating TODO item:", error);
    throw error;
  }
}
