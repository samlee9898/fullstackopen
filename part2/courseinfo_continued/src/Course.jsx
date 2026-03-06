const Header = (props) => {
  return <h2>{props.name}</h2>
}

const Content = (props) => {
  return (
  <div>
    {
      props.content.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
    }
  </div>)
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Total = (props) => <b>total of {props.count} exercises</b>

const Course = (props) => {
  const { name, parts } = props
  return (
  <div>
    <Header name={name}/>
    <Content content={parts}/>
    <Total count={parts.reduce((acc, cur) => {
      return acc + cur['exercises'];
    }, 0)}
/>
  </div>
  )
}

export default Course;