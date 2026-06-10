const root = document.documentElement;
const wechatTrigger = document.querySelector("[data-wechat-trigger]");
const wechatPopover = document.querySelector("[data-wechat-popover]");

window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--cursor-x", `${event.clientX}px`);
  root.style.setProperty("--cursor-y", `${event.clientY}px`);
});

if (wechatTrigger && wechatPopover) {
  let hideTimer;

  const showWechat = () => {
    window.clearTimeout(hideTimer);
    wechatPopover.classList.add("is-visible");
  };

  const scheduleHide = () => {
    hideTimer = window.setTimeout(() => {
      wechatPopover.classList.remove("is-visible");
    }, 2600);
  };

  wechatTrigger.addEventListener("click", () => {
    showWechat();
    scheduleHide();
  });

  wechatTrigger.addEventListener("mouseenter", showWechat);
  wechatTrigger.addEventListener("mouseleave", scheduleHide);
  wechatTrigger.addEventListener("focus", showWechat);
  wechatTrigger.addEventListener("blur", scheduleHide);
}
