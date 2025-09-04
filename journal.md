# 2025-09-04

지금은 iframe 끼리 상태 공유하는 것을 목표로 하고 있다.<br>
iframe 끼리는 window 객체를 공유하지 못하기 때문에 postMessage 를 활용해야겠다.