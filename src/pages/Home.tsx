import { useEffect, useState } from "react";
import { Todo } from "../types";

export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo>({
    id: Number(new Date()),
    title: "",
    isCompleted: false,
  });

  // 투두리스트 렌더링: 첫 로딩 데이터 패칭 함수
  useEffect(() => {
    const savedTodos = localStorage.getItem("TODOLIST");
    if (savedTodos) {
      setTodoList(JSON.parse(savedTodos));
    }
  }, []);

  const setLocalStorageTodos = () => {
    localStorage.setItem("TODOLIST", JSON.stringify(todoList));
  };

  /**
   * event를 실질적으로 사용하지 않는데 작성하지 않으면 Linter가 에러를 잡음
   * 아래의 버튼에서 함수를 한번 더 묶어서 호출하면 타입에러가 안나는데 이유를 잘 모르겠음
   */
  const addTodoList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTodoList([...todoList, todo]);
    setTodo({ id: Number(new Date()), title: "", isCompleted: false });

    setLocalStorageTodos();
  };

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
    <>
      <div>
        <input
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <button onClick={addTodoList}>추가</button>
        <div>{todo.title || "TODO를 작성해주세요"}</div>

        {todoList.map((el) => (
          <div key={el.id}>
            {el.isCompleted ? (
              <input
                type='text'
                value={el.title}
                onChange={(e) => updateTodoTitle(el.id, e.target.value)}
              />
            ) : (
              <div>제목: {el.title}</div>
            )}
            <button onClick={() => toggleCompleteTodo(el.id)}>
              {el.isCompleted ? "수정완료" : "수정"}
            </button>
            <button onClick={() => deleteTodoItem(el.id)}>삭제</button>
          </div>
        ))}
      </div>
    </>
  );
}
