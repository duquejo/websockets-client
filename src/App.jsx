import { Chat } from './components/chat/Chat.jsx';

function App() {
  return (
    <>
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-emerald-800/20 opacity-50 blur-[80px]"></div>
      </div>
      <main className="flex flex-col h-screen justify-center p-10">
        <h1 className="text-center font-monoton text-8xl font-thin text-emerald-800">Chat</h1>
        <section className="basis-2/3"></section>
        <section className="basis-1/3 h-[33.33%] max-h-[33.33%] flex flex-col justify-end gap-2 relative">
          <Chat />
        </section>
      </main>
    </>
  );
}

export default App;
