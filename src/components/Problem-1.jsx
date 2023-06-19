import React, { useState } from 'react'

const Problem1 = () => {
  const [tasks, setTasks] = useState([])

  const [show, setShow] = useState('all')

  const [name, setName] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = (evt) => {
    evt.preventDefault()

    // if (!name.length || status.length) return

    const newTask = { name, status }
    setTasks([newTask, ...tasks])

    setName('')
    setStatus('')
  }

  const handleClick = (val) => {
    setShow(val);
  }

  const filteredTasks = tasks.filter((task) => {
    const showLowerCase = show.toLowerCase();
    const statusLowerCase = task.status.toLowerCase();

    return (showLowerCase === 'active' && statusLowerCase === 'active') ||
      (showLowerCase === 'completed' && statusLowerCase === 'completed') ||
      showLowerCase === 'all';

  }).sort((a, b) => a.status.localeCompare(b.status))

  console.log({ filteredTasks })

  return (

    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
        <div className="col-6 ">
          <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center mb-4">
            <div className="col-auto">
              <input type="text" value={name} onChange={(evt) => setName(evt.currentTarget.value)} className="form-control" placeholder="Name" />
            </div>
            <div className="col-auto">
              <input type="text" value={status} onChange={(evt) => setStatus(evt.currentTarget.value)} className="form-control" placeholder="Status" />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, i) => (
                <tr key={i}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;