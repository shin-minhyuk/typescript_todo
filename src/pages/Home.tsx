import { useEffect, useState } from "react";
import { Todo } from "../types";
import TodoItem from "../components/TodoItem";

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

  useEffect(() => {
    localStorage.setItem("TODOLIST", JSON.stringify(todoList));
  }, [todoList]);

  /**
   * event를 실질적으로 사용하지 않는데 작성하지 않으면 Linter가 에러를 잡음
   * 아래의 버튼에서 함수를 한번 더 묶어서 호출하면 타입에러가 안나는데 이유를 잘 모르겠음
   */

  // 추가: 저장된 상태 기반 데이터 저장 및 로컬스토리지 추가
  const addTodoList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTodoList([...todoList, todo]);
    setTodo({ id: Number(new Date()), title: "", isCompleted: false });
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
          <TodoItem
            key={el.id}
            {...el}
            todoList={todoList}
            setTodoList={setTodoList}
          />
        ))}
      </div>
    </>
  );
}
