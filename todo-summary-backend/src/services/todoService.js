const supabase = require('../db/supabase');

const todoService = {
  async getAllTodos() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  async createTodo(todo) {
    const { data, error } = await supabase
      .from('todos')
      .insert([todo])
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  async deleteTodo(id) {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },
  
  async updateTodo(id, updates) {
    const { data, error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }
};

module.exports = todoService;