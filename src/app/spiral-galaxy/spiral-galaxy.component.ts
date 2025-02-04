import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-spiral-galaxy',
  template: '',
  styleUrls: ['./spiral-galaxy.component.scss'],
})
export class SpiralGalaxyComponent implements OnInit, AfterViewInit {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private particles!: THREE.Points;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initScene();
    this.createSpiralGalaxy();
    this.animate();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private initScene() {
    

    // Configuración inicial de la escena
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 20;

    // Agregar una luz tenue
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);
  }

  private createSpiralGalaxy() {
    const particleCount = 5000; // Número de partículas
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3); // x, y, z para cada partícula
    const colors = new Float32Array(particleCount * 3);

    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 5 + 5; // Radio del espiral
      const angle = i * 0.1; // Ángulo para la forma de espiral
      const height = (Math.random() - 0.5) * 2; // Altura aleatoria

      const x = radius * Math.cos(angle) + Math.random() * 0.5;
      const y = height;
      const z = radius * Math.sin(angle) + Math.random() * 0.5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Asignar colores aleatorios
      color.setHSL(Math.random(), 0.7, 0.7);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    // Rotar la galaxia para simular movimiento
    this.particles.rotation.y += 0.002;

    this.renderer.render(this.scene, this.camera);
  }
}
