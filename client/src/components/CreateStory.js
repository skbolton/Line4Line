import React from 'react'

const CreateStory = (props) => {

  const createStory = (e) => {
    e.preventDefault()
    const newStory = {}
    newStory.title = document.getElementById('createTitle').value
    newStory.numberUsers = document.getElementById('createNUsers').value
    newStory.length = document.getElementById('linesPerUser').value * document.getElementById('createNUsers').value;
    $.ajax({
      type: 'POST',
      url:'/stories',
      data: newStory,
      dataType: 'json',
      success: function(res){
        window.location = res.redirect
      }
    })
  }

  return (
    <div className="createStoryWrap col-xs-12">
      <form onSubmit={createStory}>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <h3>Title of story</h3>
            <input className="form-control" id="createTitle" type="text" maxLength="50" placeholder="Enter your story's title here" required="required" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <h3>Number of authors</h3>
            <input className="form-control" id="createNUsers" type="number" min="2" max="10" placeholder="#" required="required" />
          </div>
          <div className="col-sm-6">
            <h3>Number of lines each</h3>
            <input className="form-control" id="linesPerUser" type="number" min="1" max="5" placeholder="#" required="required" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-offset-1 col-sm-10">
            <button className="btn btn-info btn-lg btn-block" type="submit" value="Create">
              Create</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateStory
