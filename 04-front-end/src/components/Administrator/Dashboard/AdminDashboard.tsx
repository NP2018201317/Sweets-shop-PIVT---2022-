import { Link } from 'react-router-dom';


export default function AdminDashboard() {
    return (
        <div className="row">
            <div className="col-12 col-md-4 p-3 d-grid gap-3">
                    <h2>Categories</h2>
                    <Link className="btn btn-primary" to="/admin/dashboard/category/list">List all categories</Link>
            
                    <Link className='btn btn-primary' to="/admin/dashboard/category/add">Add a new category</Link>
                </div>
            
           

            <div className="col-12 col-md-4 p-3 d-grid gap-3">
                    <h2>Administrators</h2>
                    <Link className="btn btn-primary" to="/admin/dashboard/administrator/list">List all administrator</Link>
                    <Link className='btn btn-primary' to="/admin/dashboard/category/add">Add a new administrator</Link>
                </div>
            
            </div>
        

    )
}