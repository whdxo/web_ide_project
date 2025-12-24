export const CreateModal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <h2>Create New</h2>
        <input className="border p-1 my-2" placeholder="Name" />
        <div className="flex justify-end gap-2">
          <button>Cancel</button>
          <button>Create</button>
        </div>
      </div>
    </div>
  );
};
