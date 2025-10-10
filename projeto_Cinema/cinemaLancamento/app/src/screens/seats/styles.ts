import { StyleSheet } from 'react-native';
import * as cores from '../../../../styles/cores';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#1a1a1a",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: "#E50914",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E50914",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  availabilityInfo: {
    backgroundColor: "rgba(0, 255, 0, 0.1)",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#00ff00",
    marginTop: 5,
  },
  availabilityText: {
    color: "#00ff00",
    fontSize: 14,
    fontWeight: "bold",
  },
  screenContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  screen: {
    width: "80%",
    height: 6,
    backgroundColor: "#E50914",
    borderRadius: 50,
    shadowColor: "#E50914",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  screenText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    position: "absolute",
    top: -20,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  legendText: {
    color: "#fff",
    fontSize: 12,
  },
  seatsContainer: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rowLabel: {
    width: 30,
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  seatsRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  seat: {
    width: 28,
    height: 28,
    backgroundColor: "#4a4a4a",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#666",
  },
  seatAvailable: {
    backgroundColor: "#4a4a4a",
    borderColor: "#666",
  },
  seatSelected: {
    backgroundColor: "#00ff00",
    borderColor: "#00cc00",
  },
  seatOccupied: {
    backgroundColor: "#E50914",
    borderColor: "#b00712",
  },
  seatText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  seatTextSelected: {
    color: "#000",
  },
  seatTextOccupied: {
    color: "#fff",
    opacity: 0.5,
  },
  summary: {
    backgroundColor: "#2a2a2a",
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#00ff00",
  },
  summaryTitle: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
  },
  summaryPrice: {
    color: "#00ff00",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  confirmButton: {
    backgroundColor: "#E50914",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmButtonDisabled: {
    backgroundColor: "#555",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  // Estilos do Botão de Admin
  adminButton: {
    backgroundColor: cores.laranjaAviso,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  adminButtonText: {
    color: cores.brancoTotal,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

