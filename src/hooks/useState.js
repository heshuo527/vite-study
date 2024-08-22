let currentComponent = null;
let workInProgressHook = null;

function render(Component) {
  currentComponent = Component;
  workInProgressHook = null;
  const componentOutput = Component();
  // 假设我们将组件的输出简单地打印出来
  console.log(componentOutput);
}

function processQueue(hook) {
  while (hook.queue.length > 0) {
    const action = hook.queue.shift();
    hook.state = typeof action === 'function' ? action(hook.state) : action;
  }
}

export function useState(initialValue) {
  let hook;

  // eslint-disable-next-line no-negated-condition
  if (!workInProgressHook) {
    // 初始化 hook
    hook = {
      state: initialValue,
      queue: [],
    };
    workInProgressHook = hook;
  } else {
    hook = workInProgressHook;
  }

  const setState = (action) => {
    hook.queue.push(action);
    processQueue(hook);

    // 触发重新渲染
    render(currentComponent);
  };

  return [hook.state, setState];
}
