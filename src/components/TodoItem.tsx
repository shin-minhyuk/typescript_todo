import { Todo } from "../types";

interface TodoItemProps extends Todo {
  setLocalStorageTodos: () => void;
  // 컴포넌트를 나눌 때 linter가 에러를 많이 잡았는데 useState 상태 변경 함수를 프롭으로 내려줄 때
  // 타입을 어떻게 정해줘야할지 몰라서 찾아보니 아래의 코드처럼 작성하면 된다고 함. 하지만 또 다른 방법이 있는지? 궁금
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  todoList: Todo[];
}

export default function TodoItem({
  id,
  title,
  isCompleted,
  setLocalStorageTodos,
  setTodoList,
  todoList,
}: TodoItemProps) {
  // 수정 버튼 토글: 특정 id값 항목의 Completed를 토글하는 함수
  const toggleCompleteTodo = (id: number) => {
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );

    setTodoList(updatedTodos);
    setLocalStorageTodos();
  };

  // 수정: 특정 id값 항목을 수정하는 함수
  const updateTodoTitle = (id: number, newTitle: string) => {
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );

    setTodoList(updatedTodos);
    setLocalStorageTodos();
  };

  // 삭제: 특정 id값을 제외하는 함수
  const deleteTodoItem = (id: number) => {
    const updatedTodos = todoList.filter((todo) => todo.id !== id);

    setTodoList(updatedTodos);
    setLocalStorageTodos();
  };

  return (
    <div key={id}>
      {isCompleted ? (
        <input
          type='text'
          value={title}
          onChange={(e) => updateTodoTitle(id, e.target.value)}
        />
      ) : (
        <div>제목: {title}</div>
      )}
      <button onClick={() => toggleCompleteTodo(id)}>
        {isCompleted ? "수정완료" : "수정"}
      </button>
      <button onClick={() => deleteTodoItem(id)}>삭제</button>
    </div>
  );
}
