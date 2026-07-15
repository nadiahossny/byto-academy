"use client";

import { useRouter } from "next/navigation";
import { Search, Filter, Play, CheckCircle } from "lucide-react";

export default function PracticeCatalog() {
  const router = useRouter();

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Array",
      acceptance: "51.2%",
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      category: "Linked List",
      acceptance: "41.8%",
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating",
      difficulty: "Medium",
      category: "String",
      acceptance: "34.5%",
    },
    {
      id: 4,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      category: "Binary Search",
      acceptance: "38.0%",
    },
    {
      id: 5,
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      category: "Dynamic Programming",
      acceptance: "33.2%",
    },
    {
      id: 6,
      title: "Reverse Integer",
      difficulty: "Easy",
      category: "Math",
      acceptance: "27.9%",
    },
    {
      id: 7,
      title: "String to Integer (atoi)",
      difficulty: "Medium",
      category: "String",
      acceptance: "16.9%",
    },
    {
      id: 8,
      title: "Valid Palindrome",
      difficulty: "Easy",
      category: "String",
      acceptance: "46.1%",
    },
  ];

  const getDifficultyColor = (diff) => {
    if (diff === "Easy") return "#4caf50";
    if (diff === "Medium") return "#ff9800";
    return "#f44336";
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "40px",
        boxShadow: "var(--shadow)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "30px",
        }}
      >
        <div>
          <h2
            style={{
              color: "var(--primary-color)",
              fontSize: "2.5rem",
              marginBottom: "10px",
            }}
          >
            Practice Problems
          </h2>
          <p style={{ color: "var(--text-light)", fontSize: "1.1rem" }}>
            Sharpen your coding skills with algorithmic challenges.
          </p>
        </div>

        <div style={{ display: "flex", gap: "15px" }}>
          <div style={{ position: "relative" }}>
            <Search
              size={18}
              color="#aaa"
              style={{ position: "absolute", left: "15px", top: "12px" }}
            />
            <input
              type="text"
              placeholder="Search problems..."
              style={{
                padding: "10px 15px 10px 40px",
                borderRadius: "30px",
                border: "1px solid #ddd",
                outline: "none",
              }}
            />
          </div>
          <button
            style={{
              background: "#f4f5f7",
              color: "var(--primary-color)",
              border: "none",
              padding: "10px 20px",
              borderRadius: "30px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "2px solid #f0f0f0",
                color: "var(--text-light)",
              }}
            >
              <th style={{ padding: "15px", fontWeight: "bold" }}>Status</th>
              <th style={{ padding: "15px", fontWeight: "bold" }}>Title</th>
              <th style={{ padding: "15px", fontWeight: "bold" }}>
                Acceptance
              </th>
              <th style={{ padding: "15px", fontWeight: "bold" }}>
                Difficulty
              </th>
              <th style={{ padding: "15px", fontWeight: "bold" }}>Category</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((prob) => (
              <tr
                key={prob.id}
                onClick={() => router.push("/practice/" + prob.id)}
                style={{
                  borderBottom: "1px solid #f9f9f9",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#fafbfe")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <td style={{ padding: "15px" }}>
                  {prob.id === 1 ? (
                    <CheckCircle size={20} color="#4caf50" />
                  ) : (
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "2px solid #ddd",
                        borderRadius: "50%",
                      }}
                    ></div>
                  )}
                </td>
                <td
                  style={{
                    padding: "15px",
                    color: "var(--primary-color)",
                    fontWeight: "bold",
                    fontSize: "1.05rem",
                  }}
                >
                  {prob.id}. {prob.title}
                </td>
                <td style={{ padding: "15px", color: "var(--text-main)" }}>
                  {prob.acceptance}
                </td>
                <td
                  style={{
                    padding: "15px",
                    color: getDifficultyColor(prob.difficulty),
                    fontWeight: "bold",
                  }}
                >
                  {prob.difficulty}
                </td>
                <td style={{ padding: "15px" }}>
                  <span
                    style={{
                      background: "#f4f5f7",
                      padding: "5px 10px",
                      borderRadius: "15px",
                      fontSize: "0.8rem",
                      color: "var(--text-light)",
                      fontWeight: "bold",
                    }}
                  >
                    {prob.category}
                  </span>
                </td>
                <td style={{ padding: "15px", textAlign: "right" }}>
                  <button
                    style={{
                      background: "transparent",
                      color: "var(--accent-color)",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Solve <Play size={16} fill="var(--accent-color)" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
