"use client";

import { useEffect, useRef } from "react";
import type { BranchCardData } from "@/lib/cms-branch";
import { getBranchesMapCenter } from "@/lib/branch-location";
import "leaflet/dist/leaflet.css";

type BranchMapProps = {
  branches: BranchCardData[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

type LeafletModule = typeof import("leaflet");

function hasCoordinates(
  branch: BranchCardData,
): branch is BranchCardData & { lat: number; lng: number } {
  return branch.lat != null && branch.lng != null;
}

function createPinIcon(L: LeafletModule, isSelected: boolean) {
  const color = isSelected ? "#e11d48" : "#0d4a8f";

  return L.divIcon({
    className: "branch-map-pin",
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42" aria-hidden="true">
      <path fill="${color}" stroke="#ffffff" stroke-width="2" d="M16 1C9.4 1 4 6.4 4 13c0 9.5 12 27 12 27s12-17.5 12-27C28 6.4 22.6 1 16 1z"/>
    </svg>`,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -38],
  });
}

export function BranchMap({ branches, selectedId, onSelect }: BranchMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<import("leaflet").Marker[]>([]);
  const leafletRef = useRef<LeafletModule | null>(null);
  const skipFlyToRef = useRef(true);

  useEffect(() => {
    let disposed = false;
    let cleanupResize: (() => void) | undefined;

    async function initMap() {
      if (!containerRef.current || mapRef.current) return;

      const L = await import("leaflet");
      if (disposed) return;

      leafletRef.current = L;

      const mappable = branches.filter(hasCoordinates);
      const center = getBranchesMapCenter(mappable);

      const map = L.map(containerRef.current, {
        scrollWheelZoom: true,
        zoomControl: true,
      }).setView([center.lat, center.lng], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;

      const resize = () => {
        map.invalidateSize();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(containerRef.current);
      resize();
      cleanupResize = () => observer.disconnect();
    }

    void initMap();

    return () => {
      disposed = true;
      cleanupResize?.();
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  }, [branches]);

  useEffect(() => {
    const map = mapRef.current;
    const L = leafletRef.current;
    if (!map || !L) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    branches.forEach((branch) => {
      if (!hasCoordinates(branch)) return;

      const isSelected = branch.id === selectedId;
      const icon = createPinIcon(L, isSelected);

      const marker = L.marker([branch.lat, branch.lng], { icon })
        .addTo(map)
        .on("click", () => onSelect(branch.id));

      marker.bindPopup(
        `<strong>${branch.title}</strong><br/>${branch.address || ""}`,
      );

      markersRef.current.push(marker);
    });
  }, [branches, onSelect, selectedId]);

  useEffect(() => {
    const map = mapRef.current;
    const L = leafletRef.current;
    if (!map || !L) return;

    const mappable = branches.filter(hasCoordinates);

    if (mappable.length > 0) {
      const bounds = L.latLngBounds(
        mappable.map((branch) => [branch.lat, branch.lng] as [number, number]),
      );
      map.fitBounds(bounds.pad(0.04), {
        padding: [32, 32],
        maxZoom: 16,
      });
    }
  }, [branches]);

  useEffect(() => {
    const selected = branches.find((branch) => branch.id === selectedId);
    const map = mapRef.current;
    if (!selected || !hasCoordinates(selected) || !map) return;

    if (skipFlyToRef.current) {
      skipFlyToRef.current = false;
      return;
    }

    map.flyTo([selected.lat, selected.lng], 17, { duration: 0.8 });
  }, [branches, selectedId]);

  return (
    <div
      ref={containerRef}
      className="h-full min-h-[360px] w-full overflow-hidden rounded-none bg-white lg:min-h-0 lg:rounded-2xl lg:border lg:border-slate-200"
      aria-label="Салбарын газрын зураг"
    />
  );
}
