import React from 'react'

const CreateStory = (props) => {

  const createStory = (e) => {
    e.preventDefault()
    const newStory = {}
    newStory.title = document.getElementById('createTitle').value
    newStory.numberUsers = document.getElementById('createNUsers').value
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
    <div className="createStoryWrap">
      <h3>A super creative title</h3>
      <form onSubmit={createStory}>
        <div>  
          <input className="createStoryInput createTitleInput" id="createTitle" type="text" placeholder="The Tale of the..." />
        </div>
        <div className="containInputs">
          <div className="containCreateNumber">
            <h3>Number of users</h3>
            <input className="createStoryInput createNumberInput" id="createNUsers" type="number" min="1" max="10" placeholder="5"/>
          </div>
          <div className="containCreateLine">
            <h3> Max number of lines in story</h3>
            <input className="createStoryInput createLineInput" type="number" max="100"/>
          </div>
          <div className="containCreateUserLines">
            <h3> Number of lines per user </h3>
            <input className="createStoryInput createUserLinesInput" type="number" min="1" max="5" placeholder="1"/>
          </div>
        </div>
        <div className='createButtonWrap'>
          <input className="standardButton blackButton" type="submit" value="Create" />
        </div>
      </form>
    </div>
  )
}

export default CreateStory