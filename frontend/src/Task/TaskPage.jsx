
const TaskPage = () => {
    const { taskId } = useParams(); // Get the task ID from the URL
    const [task, setTask] = useState(null);
    const token = localStorage.getItem('token');
  
    useEffect(() => {
      const fetchTask = async () => {
        const response = await fetch(`http://localhost:5000/api/tasks/gettaskbyid/${taskId.trim()}`);
        const data = await response.json();
        setTask(data);
      };
  
      if (taskId) {
        fetchTask();
      }
    }, [taskId]);
  
    const handleUpdate = async (updatedTask) => {

        try {
          const response = await fetch(`http://localhost:5000/api/tasks/updatetask/${updatedTask._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedTask),
          });
      
          if (response.ok) {
            const updatedTaskData = await response.json();
            setTask(updatedTaskData);
            alert('Task updated successfully!');
          } else {
            const errorData = await response.json();
            alert(`Failed to update task: ${errorData.error || 'Unknown error'}`);
          }
        } catch (error) {
          console.error('Error updating task:', error);
          alert('An error occurred while updating the task');
        }
      };

      const handleDelete = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/deletetask/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Task deleted successfully!');
                // Optionally, redirect or update the UI to remove the deleted task
            } else {
                const errorData = await response.json();
                alert(`Failed to delete task: ${errorData.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('An error occurred while deleting the task');
        }
    };

      
    return (
      <TaskInfoShow 
          task={task} 
          onUpdate={handleUpdate} 
          handleDelete={handleDelete} // Ensure this line is present
      />
  );
  
  };
  