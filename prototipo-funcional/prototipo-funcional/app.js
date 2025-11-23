// app.js - comportamento do protótipo melhorado
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  const views = document.querySelectorAll('.view');
  const pageTitle = document.getElementById('pageTitle');

  function showView(id){
    views.forEach(v => v.classList.remove('active'));
    const view = document.getElementById('view-' + id) || document.getElementById(id);
    if(view) view.classList.add('active');
    // update title
    const titles = {home: 'Fazer Denúncia', form: 'Formulário', admin: 'Painel', about: 'Sobre o Projeto'};
    pageTitle.textContent = titles[id] || 'Canal de Denúncia';
    // set active nav
    navItems.forEach(n => n.classList.toggle('active', n.dataset.nav === id));
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      showView(item.dataset.nav);
    });
  });

  // hero buttons
  document.getElementById('startReport').addEventListener('click', () => showView('form'));
  document.getElementById('btnHome').addEventListener('click', () => showView('home'));
  document.getElementById('btnAdmin').addEventListener('click', () => showView('admin'));
  document.querySelectorAll('[data-nav-target]').forEach(b => b.addEventListener('click', (e) => {
    const t = e.currentTarget.getAttribute('data-nav-target');
    showView(t);
  }));

  // form stepper logic
  const steps = document.querySelectorAll('.form-stepper .step');
  const panels = document.querySelectorAll('.step-panel');
  let currentStep = 1;
  function setStep(step){
    currentStep = step;
    steps.forEach(s => s.classList.toggle('active', Number(s.dataset.step) === step));
    panels.forEach(p => p.classList.toggle('active', Number(p.dataset.step) === step));
  }

  document.getElementById('formNext1').addEventListener('click', () => {
    const end = document.getElementById('inputEndereco');
    if(!end.value.trim()){ end.focus(); end.style.boxShadow = '0 0 0 3px rgba(43,124,255,0.12)'; setTimeout(()=> end.style.boxShadow='none',900); return; }
    setStep(2);
  });
  document.getElementById('formNext2').addEventListener('click', () => setStep(3));
  document.getElementById('formBack2').addEventListener('click', () => setStep(1));
  document.getElementById('formBack3').addEventListener('click', () => setStep(2));

  // review and submit
  const form = document.getElementById('reportForm');
  const reviewBox = document.getElementById('reviewBox');
  const confirmCheck = document.getElementById('confirmCheck');
  const submitBtn = document.getElementById('submitReport');

  confirmCheck.addEventListener('change', ()=> submitBtn.disabled = !confirmCheck.checked);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // build protocol and show success
    const protocolo = '#'+(Date.now().toString().slice(-10));
    document.getElementById('protocolValue').textContent = protocolo;
    showView('success');
  });

  // populate review when entering step 3
  const observer = new MutationObserver(m => {
    const active = document.querySelector('.step-panel.active');
    if(active && active.dataset.step === '3'){
      const endereco = document.getElementById('inputEndereco').value || '-';
      const descricao = document.getElementById('inputDescricao').value || '-';
      reviewBox.innerHTML = '<strong>Endereço:</strong><div>'+endereco+'</div><strong style="margin-top:8px;display:block">Descrição:</strong><div>'+descricao+'</div>';
    }
  });
  observer.observe(document.querySelector('.form-shell'), {attributes:true, childList:true, subtree:true});

  // copy protocol
  document.getElementById('copyProtocol').addEventListener('click', async ()=>{
    const text = document.getElementById('protocolValue').textContent;
    try{ await navigator.clipboard.writeText(text); alert('Protocolo copiado: '+text); }catch(err){ alert('Copiar não suportado neste navegador.'); }
  });

  // new report
  document.getElementById('submitNew').addEventListener('click', ()=>{
    // reset form
    form.reset();
    setStep(1);
    showView('home');
  });

  // small accessibility: keyboard nav for nav items
  navItems.forEach(n => n.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); n.click(); } }));

});
