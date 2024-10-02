const Alertbox = ({show, onCancel, onConfirm, message}) =>{
    if(!show) return null;
    
    return (
        <div ClassName="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div ClassName="toast-body">
            
                <i class="bi bi-trash-fill"></i>
                <h5>Are you sure you want to Delete</h5>
                
                <div ClassName="mt-2 pt-2 border-top">
                    <button onClick={onCancel} type="button" ClassName="btn btn-warning btn-sm">Cancel</button>
                    <button onClick={onConfirm} type="button" ClassName="btn btn-info btn-sm" data-bs-dismiss="toast">Yes</button>
                </div>
            </div>
        </div>
    );
}

export default Alertbox;