
const InputForm = () => {
    
  return (
    <form  onSubmit={''}>
      <h3 style={{ display: 'flex', justifyContent: 'center'}}>To-Do</h3>
      <input
        type="text"        
        value={""}
        onChange={''}       
        required
      />



      <button type="submit">Add</button>
    </form>
  );
};

export default InputForm;