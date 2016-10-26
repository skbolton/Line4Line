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
    <div className="createStoryWrap">
      <h3>Title of story</h3>
      <form onSubmit={createStory}>
        <div>
          <input className="createStoryInput createTitleInput" id="createTitle" type="text" maxLength="50" placeholder="Enter your story's title here" required="required" />
        </div>
        <div className="containInputs">
          <div className="containCreateNumber">
            <h3>Number of authors</h3>
            <input className="createStoryInput createNumberInput" id="createNUsers" type="number" min="2" max="10" placeholder="#" required="required" />
          </div>
          <div className="containCreateUserLines">
            <h3>Number of lines each</h3>
            <input className="createStoryInput createUserLinesInput" id="linesPerUser" type="number" min="1" max="5" placeholder="#" required="required" />
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
